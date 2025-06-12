import React, { useState, useRef } from 'react';
import ExplanationPanel from './ExplanationPanel';

const ArrayVisualizer = () => {
  const [array, setArray] = useState([5, 2, 8, 1, 9, 3]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [insertValue, setInsertValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [traversalIndex, setTraversalIndex] = useState(-1);
  const [isTraversing, setIsTraversing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('');
  const timeoutIdsRef = useRef([]);
  const isTraversingRef = useRef(false);

  const getCodeSnippet = (op) => {
    const snippets = {
      add: 'arr.push(newValue);',
      remove: 'arr.pop();',
      insert: 'arr.splice(index, 0, value);',
      search: 'arr.indexOf(value);',
      traverse: 'for (let i=0; i<arr.length; i++) { ... }'
    };
    return snippets[op] || '// Hover over buttons to see code';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor:
                traversalIndex === index
                  ? '#ffe66d' // yellow for traversal
                  : highlightIndex === index
                    ? '#ff6b6b' // red for search highlight
                    : '#4ecdc4',
              border: '2px solid #333',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
          >
            {value}
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button
          onMouseEnter={() => setCurrentOperation('add')}
          onMouseLeave={() => setCurrentOperation('')}
          onClick={() => {
            const randomNum = Math.floor(Math.random() * 100);
            setArray([...array, randomNum]);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a535c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Add Random Number
        </button>
        <button
          onMouseEnter={() => setCurrentOperation('remove')}
          onMouseLeave={() => setCurrentOperation('')}
          onClick={() => {
            if (array.length > 0) setArray(array.slice(0, -1));
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Remove Last Number
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Value"
          value={insertValue}
          onChange={e => setInsertValue(e.target.value)}
          style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <input
          type="number"
          placeholder="Index"
          value={insertIndex}
          onChange={e => setInsertIndex(e.target.value)}
          min="0"
          max={array.length}
          style={{ width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          onMouseEnter={() => setCurrentOperation('insert')}
          onMouseLeave={() => setCurrentOperation('')}
          onClick={() => {
            const idx = parseInt(insertIndex, 10);
            const val = parseInt(insertValue, 10);
            if (!isNaN(idx) && !isNaN(val) && idx >= 0 && idx <= array.length) {
              const newArr = [...array];
              newArr.splice(idx, 0, val);
              setArray(newArr);
              setInsertValue('');
              setInsertIndex('');
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Insert at Index
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Search value"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{ width: '120px', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          onMouseEnter={() => setCurrentOperation('search')}
          onMouseLeave={() => setCurrentOperation('')}
          onClick={() => {
            const val = parseInt(searchValue, 10);
            const idx = array.indexOf(val);
            setHighlightIndex(idx);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a535c',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Search & Highlight
        </button>
        <button
          onClick={() => {
            setHighlightIndex(-1);
            setSearchValue('');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Clear Highlight
        </button>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button
          disabled={isTraversing}
          onMouseEnter={() => setCurrentOperation('traverse')}
          onMouseLeave={() => setCurrentOperation('')}
          onClick={async () => {
            setIsTraversing(true);
            isTraversingRef.current = true;
            timeoutIdsRef.current = [];
            
            for (let i = 0; i < array.length; i++) {
              if (!isTraversingRef.current) break;
              
              setTraversalIndex(i);
              await new Promise(res => {
                const id = setTimeout(res, 500);
                timeoutIdsRef.current.push(id);
              });
            }
            
            // Clear the highlight after traversal completes
            setTraversalIndex(-1);
            setIsTraversing(false);
            isTraversingRef.current = false;
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffe66d',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: isTraversing ? 'not-allowed' : 'pointer'
          }}
        >
          Traverse Array
        </button>
        <button
          disabled={!isTraversing}
          onClick={() => {
            timeoutIdsRef.current.forEach(clearTimeout);
            timeoutIdsRef.current = [];
            
            setIsTraversing(false);
            isTraversingRef.current = false;
            setTraversalIndex(-1);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#b2bec3',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: !isTraversing ? 'not-allowed' : 'pointer'
          }}
        >
          Stop Traversal
        </button>
      </div>
      
      <div style={{ textAlign: 'center', color: 'white' }}>
        <p>Array: [{array.join(', ')}]</p>
        <p>Length: {array.length}</p>
      </div>

      <ExplanationPanel operation={currentOperation} />

      <div style={{ 
        backgroundColor: '#2d3436', 
        padding: '15px',
        borderRadius: '8px',
        marginTop: '20px',
        color: '#dfe6e9',
        fontFamily: 'monospace'
      }}>
        <h4 style={{ marginTop: 0 }}>Code Preview</h4>
        <pre>{`// Last operation: ${getCodeSnippet(currentOperation)}`}</pre>
      </div>
    </div>
  );
};

export default ArrayVisualizer;
