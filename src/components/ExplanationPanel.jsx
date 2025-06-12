const ExplanationPanel = ({ operation }) => {
  const explanations = {
    add: "Appending (O(1)): Directly adds to end without shifting elements",
    remove: "Popping (O(1)): Removes last element without index recalculation",
    insert: "Insertion (O(n)): Requires shifting all subsequent elements",
    search: "Linear Search (O(n)): Checks elements sequentially until found",
    traverse: "Traversal (O(n)): Visits every element exactly once"
  };

  return (
    <div style={{ 
      backgroundColor: '#1a535c', 
      padding: '15px', 
      borderRadius: '8px',
      marginTop: '20px',
      color: 'white'
    }}>
      <h3 style={{ marginTop: 0 }}>DSA Concept</h3>
      <p>{explanations[operation] || "Hover over buttons for details"}</p>
      
      <div style={{ marginTop: '15px' }}>
        <h4>Time Complexities</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #4ecdc4' }}>Operation</th>
              <th style={{ borderBottom: '2px solid #4ecdc4' }}>Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Access</td><td>O(1)</td></tr>
            <tr><td>Search</td><td>O(n)</td></tr>
            <tr><td>Insertion</td><td>O(n)</td></tr>
            <tr><td>Deletion</td><td>O(n)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExplanationPanel; 