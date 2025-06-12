import React, { useState, useRef } from 'react';

/**
 * ControlSection component for organized button/input groups
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {Array<Object>} props.buttons - Array of button configurations
 * @param {Array<Object>} props.inputs - Array of input configurations
 * @returns {JSX.Element} Rendered control section
 */
const ControlSection = ({ title, buttons = [], inputs = [] }) => (
  <div style={{
    backgroundColor: '#2d3436',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #636e72'
  }}>
    <h4 style={{ color: '#dfe6e9', marginTop: 0, marginBottom: '15px' }}>{title}</h4>
    {inputs.length > 0 && (
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        {inputs.map((input, idx) => (
          <input
            key={idx}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            min={input.min}
            max={input.max}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #636e72',
              fontSize: '14px',
              flex: 1
            }}
          />
        ))}
      </div>
    )}
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {buttons.map((button, idx) => (
        <button
          key={idx}
          onClick={button.onClick}
          disabled={button.disabled}
          style={{
            padding: '8px 12px',
            backgroundColor: button.color,
            color: button.textColor || 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: button.disabled ? 'not-allowed' : 'pointer',
            opacity: button.disabled ? 0.6 : 1
          }}
        >
          {button.text}
        </button>
      ))}
    </div>
  </div>
);

/**
 * TimeComplexityPanel component displaying array operation time complexities
 * @returns {JSX.Element} Rendered time complexity table
 */
const TimeComplexityPanel = () => (
  <div style={{
    backgroundColor: '#1a535c',
    padding: '20px',
    borderRadius: '8px',
    color: 'white'
  }}>
    <h3 style={{ marginTop: 0 }}>Time Complexities</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #4ecdc4' }}>
          <th style={{ textAlign: 'left', padding: '8px' }}>Operation</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Best Case</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Average</th>
          <th style={{ textAlign: 'left', padding: '8px' }}>Worst Case</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{ padding: '8px' }}>Access</td><td>O(1)</td><td>O(1)</td><td>O(1)</td></tr>
        <tr><td style={{ padding: '8px' }}>Search</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr>
        <tr><td style={{ padding: '8px' }}>Insertion</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr>
        <tr><td style={{ padding: '8px' }}>Deletion</td><td>O(1)</td><td>O(n)</td><td>O(n)</td></tr>
      </tbody>
    </table>
  </div>
);

/**
 * PseudocodePanel component showing algorithm pseudocode for different operations
 * @param {Object} props - Component props
 * @param {string} props.operation - Current operation to display pseudocode for
 * @returns {JSX.Element} Rendered pseudocode panel
 */
const PseudocodePanel = ({ operation }) => {
  const pseudocodes = {
    add: `ALGORITHM: Array Push
BEGIN
  arr[length] = newValue
  length = length + 1
  RETURN arr
END`,
    remove: `ALGORITHM: Array Pop
BEGIN
  IF length > 0 THEN
    length = length - 1
    RETURN arr[length]
  END IF
END`,
    insert: `ALGORITHM: Array Insert
BEGIN
  FOR i = length DOWN TO index DO
    arr[i+1] = arr[i]
  END FOR
  arr[index] = newValue
  length = length + 1
END`,
    search: `ALGORITHM: Linear Search
BEGIN
  FOR i = 0 TO length-1 DO
    IF arr[i] = target THEN
      RETURN i
    END IF
  END FOR
  RETURN -1
END`,
    traverse: `ALGORITHM: Array Traversal
BEGIN
  FOR i = 0 TO length-1 DO
    PROCESS arr[i]
  END FOR
END`
  };

  return (
    <div style={{
      backgroundColor: '#2d3436',
      padding: '20px',
      borderRadius: '8px',
      color: '#dfe6e9'
    }}>
      <h3 style={{ marginTop: 0 }}>Pseudocode</h3>
      <pre style={{
        backgroundColor: '#636e72',
        padding: '15px',
        borderRadius: '6px',
        overflow: 'auto',
        fontSize: '12px',
        lineHeight: '1.4'
      }}>
        {pseudocodes[operation] || '// Select an operation to see pseudocode'}
      </pre>
    </div>
  );
};

/**
 * Main ArrayVisualizer component for interactive array operations visualization
 * Provides animated demonstrations of array operations including add, remove, insert, search, and traversal
 * @returns {JSX.Element} Complete array visualizer interface
 */
const ArrayVisualizer = () => {
  // Array state and basic operation states
  /** @type {[number[], Function]} Array of numbers and setter function */
  const [array, setArray] = useState([5, 2, 8, 1, 9, 3]);
  
  /** @type {[number, Function]} Index of highlighted element for search operations */
  const [highlightIndex, setHighlightIndex] = useState(-1);
  
  /** @type {[string, Function]} Value to insert into array */
  const [insertValue, setInsertValue] = useState('');
  
  /** @type {[string, Function]} Index position for insertion */
  const [insertIndex, setInsertIndex] = useState('');
  
  /** @type {[string, Function]} Value to search for in array */
  const [searchValue, setSearchValue] = useState('');
  
  /** @type {[number, Function]} Current index during array traversal */
  const [traversalIndex, setTraversalIndex] = useState(-1);
  
  /** @type {[boolean, Function]} Whether array traversal is currently active */
  const [isTraversing, setIsTraversing] = useState(false);
  
  /** @type {[string, Function]} Current operation being performed */
  const [currentOperation, setCurrentOperation] = useState('');
  
  /** @type {React.MutableRefObject<number[]>} Reference to store timeout IDs for cleanup */
  const timeoutIdsRef = useRef([]);
  
  /** @type {React.MutableRefObject<boolean>} Reference to track traversal state */
  const isTraversingRef = useRef(false);

  // Animation states for "add to end" operation
  /** @type {[boolean, Function]} Whether add animation is currently running */
  const [isAddAnimating, setIsAddAnimating] = useState(false);
  
  /** @type {[number, Function]} Index being animated during add operation */
  const [addAnimationIndex, setAddAnimationIndex] = useState(-1);
  
  /** @type {[number|null, Function]} Value pending to be added to array */
  const [pendingValue, setPendingValue] = useState(null);
  
  /** @type {[boolean, Function]} Whether to show new cell animation */
  const [showNewCell, setShowNewCell] = useState(false);

  // Animation states for "remove last" operation
  /** @type {[boolean, Function]} Whether remove animation is currently running */
  const [isRemoveAnimating, setIsRemoveAnimating] = useState(false);
  
  /** @type {[number, Function]} Index being animated during remove operation */
  const [removeAnimationIndex, setRemoveAnimationIndex] = useState(-1);
  
  /** @type {[number, Function]} Index of element fading out during remove */
  const [removeFadeIndex, setRemoveFadeIndex] = useState(-1);

  // Animation states for "insert at index" operation
  /** @type {[boolean, Function]} Whether insert animation is currently running */
  const [isInsertAnimating, setIsInsertAnimating] = useState(false);
  
  /** @type {[number, Function]} Index being animated during insert operation */
  const [insertAnimationIndex, setInsertAnimationIndex] = useState(-1);
  
  /** @type {[number|null, Function]} Value pending to be inserted */
  const [pendingInsertValue, setPendingInsertValue] = useState(null);
  
  /** @type {[number, Function]} Position where value will be inserted */
  const [pendingInsertAt, setPendingInsertAt] = useState(-1);
  
  /** @type {[boolean, Function]} Whether to show insert cell animation */
  const [showInsertCell, setShowInsertCell] = useState(false);

  /**
   * Helper function to check if any animation is currently running
   * @type {boolean}
   */
  const isAnyAnimating = isAddAnimating || isRemoveAnimating || isInsertAnimating;

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '30px', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      
      {/* LEFT COLUMN - Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Array Display */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'center',
            marginBottom: '15px'
          }}>
            {array.map((value, index) => {
              // Remove last animation: fade out last cell
              let style = {
                width: '50px',
                height: '50px',
                backgroundColor:
                  isAddAnimating && addAnimationIndex === index
                    ? '#ff4757'
                    : isRemoveAnimating && removeAnimationIndex === index
                      ? '#ff4757'
                      : isInsertAnimating && insertAnimationIndex === index
                        ? '#ff4757'
                        : traversalIndex === index
                          ? '#ffe66d'
                          : highlightIndex === index
                            ? '#ff6b6b'
                            : '#4ecdc4',
                border: '2px solid #333',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                transition: 'all 0.3s ease',
                transform:
                  (isAddAnimating && addAnimationIndex === index) ||
                  (isRemoveAnimating && removeAnimationIndex === index) ||
                  (isInsertAnimating && insertAnimationIndex === index)
                    ? 'scale(1.1)'
                    : 'scale(1)',
                opacity: removeFadeIndex === index ? 0 : 1,
                animation: removeFadeIndex === index ? 'fadeOut 0.5s forwards' : undefined
              };

              // Insert animation: shift cells to the right
              if (
                isInsertAnimating &&
                pendingInsertAt !== -1 &&
                index >= pendingInsertAt &&
                index < array.length - 1
              ) {
                style = {
                  ...style,
                  transition: 'transform 0.3s',
                  transform: 'translateX(60px)'
                };
              }
              return (
                <div key={index} style={style}>
                  {value}
                </div>
              );
            })}
            {/* Add new cell animation */}
            {showNewCell && (
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ff4757',
                  border: '2px solid #333',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  animation: 'slideIn 0.5s ease-out',
                  transform: 'scale(1.1)'
                }}
              >
                {pendingValue}
              </div>
            )}
            {/* Insert new cell animation */}
            {showInsertCell && (
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#ff4757',
                  border: '2px solid #333',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: 'white',
                  animation: 'slideIn 0.5s ease-out',
                  transform: 'scale(1.1)'
                }}
              >
                {pendingInsertValue}
              </div>
            )}
          </div>
          <p style={{ color: 'white', margin: '5px 0' }}>Array: [{array.join(', ')}]</p>
          <p style={{ color: 'white', margin: '5px 0' }}>Length: {array.length}</p>
        </div>
  
        {/* Control Sections */}
        <ControlSection 
          title="Basic Operations"
          buttons={[
            {
              text: "Add Random Number",
              onClick: async () => {
                if (isAnyAnimating) return;
                const randomNum = Math.floor(Math.random() * 100);
                setPendingValue(randomNum);
                setIsAddAnimating(true);
                setCurrentOperation('add');
                // Step 1: Traverse to find the end (highlight each cell red)
                for (let i = 0; i < array.length; i++) {
                  setAddAnimationIndex(i);
                  await new Promise(res => setTimeout(res, 300));
                }
                // Step 2: Show new cell appearing
                setShowNewCell(true);
                setAddAnimationIndex(array.length);
                await new Promise(res => setTimeout(res, 500));
                // Step 3: Add the value to the array
                setArray(prev => [...prev, randomNum]);
                await new Promise(res => setTimeout(res, 300));
                // Step 4: Clear animation states
                setAddAnimationIndex(-1);
                setShowNewCell(false);
                setPendingValue(null);
                setIsAddAnimating(false);
              },
              color: '#1a535c',
              disabled: isAnyAnimating
            },
            {
              text: "Remove Last Number", 
              onClick: async () => {
                if (isAnyAnimating || array.length === 0) return;
                setIsRemoveAnimating(true);
                setCurrentOperation('remove');
                // Step 1: Traverse to last element
                for (let i = 0; i < array.length; i++) {
                  setRemoveAnimationIndex(i);
                  await new Promise(res => setTimeout(res, 300));
                }
                // Step 2: Fade out last cell
                setRemoveFadeIndex(array.length - 1);
                await new Promise(res => setTimeout(res, 500));
                // Step 3: Remove last element
                setArray(prev => prev.slice(0, -1));
                // Step 4: Clear animation states
                setRemoveAnimationIndex(-1);
                setRemoveFadeIndex(-1);
                setIsRemoveAnimating(false);
              },
              color: '#ff6b6b',
              disabled: isAnyAnimating || array.length === 0
            }
          ]}
        />
  
        <ControlSection 
          title="Insert Operation"
          inputs={[
            {
              type: "number",
              placeholder: "Value",
              value: insertValue,
              onChange: e => setInsertValue(e.target.value)
            },
            {
              type: "number", 
              placeholder: "Index (use -1 for end)",
              value: insertIndex,
              onChange: e => setInsertIndex(e.target.value)
            }
          ]}
          buttons={[
            {
              text: "Insert at Index",
              onClick: async () => {
                if (isAnyAnimating) return;
                const idx = parseInt(insertIndex, 10);
                const val = parseInt(insertValue, 10);
                
                // Validation with error message
                if (isNaN(idx) || isNaN(val)) {
                  alert("Please enter valid numbers for both value and index.");
                  return;
                }
                
                // Handle out of bounds (except -1 special case)
                if ((idx < -1 || idx > array.length)) {
                  alert(`Index out of bounds. Please use an index between -1 and ${array.length}.`);
                  return;
                }
                
                setIsInsertAnimating(true);
                setPendingInsertValue(val);
                
                // Handle -1 as special case (add to end)
                const insertPosition = idx === -1 ? array.length : idx;
                setPendingInsertAt(insertPosition);
                setCurrentOperation('insert');
                
                // Step 1: Traverse to index
                for (let i = 0; i < insertPosition; i++) {
                  setInsertAnimationIndex(i);
                  await new Promise(res => setTimeout(res, 300));
                }
                setInsertAnimationIndex(insertPosition);
                await new Promise(res => setTimeout(res, 300));
                
                // Step 2: Show new cell at index
                setShowInsertCell(true);
                await new Promise(res => setTimeout(res, 500));
                
                // Step 3: Insert value and shift
                const newArr = [...array];
                newArr.splice(insertPosition, 0, val);
                setArray(newArr);
                await new Promise(res => setTimeout(res, 300));
                
                // Step 4: Clear animation states
                setInsertAnimationIndex(-1);
                setShowInsertCell(false);
                setPendingInsertValue(null);
                setPendingInsertAt(-1);
                setInsertValue('');
                setInsertIndex('');
                setIsInsertAnimating(false);
              },
              color: '#4ecdc4',
              disabled: isAnyAnimating
            }
          ]}
        />
  
        <ControlSection 
          title="Search & Highlight"
          inputs={[
            {
              type: "number",
              placeholder: "Search value",
              value: searchValue,
              onChange: e => setSearchValue(e.target.value)
            }
          ]}
          buttons={[
            {
              text: "Search & Highlight",
              onClick: () => {
                if (isAnyAnimating) return;
                const val = parseInt(searchValue, 10);
                const idx = array.indexOf(val);
                setHighlightIndex(idx);
                setCurrentOperation('search');
              },
              color: '#1a535c',
              disabled: isAnyAnimating
            },
            {
              text: "Clear Highlight",
              onClick: () => {
                setHighlightIndex(-1);
                setSearchValue('');
              },
              color: '#ff6b6b',
              disabled: isAnyAnimating
            }
          ]}
        />
  
        <ControlSection 
          title="Array Traversal"
          buttons={[
            {
              text: "Traverse Array",
              onClick: async () => {
                if (isAnyAnimating) return;
                setIsTraversing(true);
                isTraversingRef.current = true;
                timeoutIdsRef.current = [];
                setCurrentOperation('traverse');
                for (let i = 0; i < array.length; i++) {
                  if (!isTraversingRef.current) break;
                  setTraversalIndex(i);
                  await new Promise(res => {
                    const id = setTimeout(res, 500);
                    timeoutIdsRef.current.push(id);
                  });
                }
                setTraversalIndex(-1);
                setIsTraversing(false);
                isTraversingRef.current = false;
              },
              color: '#ffe66d',
              textColor: '#333',
              disabled: isAnyAnimating || isTraversing
            },
            {
              text: "Stop Traversal",
              onClick: () => {
                timeoutIdsRef.current.forEach(clearTimeout);
                timeoutIdsRef.current = [];
                setIsTraversing(false);
                isTraversingRef.current = false;
                setTraversalIndex(-1);
              },
              color: '#b2bec3',
              textColor: '#333',
              disabled: isAnyAnimating || !isTraversing
            }
          ]}
        />
      </div>
  
      {/* RIGHT COLUMN - Educational Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TimeComplexityPanel />
        <PseudocodePanel operation={currentOperation} />
      </div>
    </div>
  );  
};

export default ArrayVisualizer;
