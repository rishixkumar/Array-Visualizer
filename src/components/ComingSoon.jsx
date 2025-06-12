import React from 'react';

const ComingSoon = () => (
  <div style={{
    backgroundColor: '#2d3436',
    color: '#222',
    borderRadius: '10px',
    padding: '24px',
    marginTop: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }}>
    <h2 style={{ marginTop: 0, marginBottom: '12px', color: '#ffe66d' }}>🚧 Coming Soon: Planned Features</h2>
    <ul style={{ marginLeft: '24px', fontSize: '16px', color: '#ffe66d' }}>
      <li><b>Sorting Algorithm Visualizations</b> (Bubble, Insertion, Selection): Step-by-step, animated sorting with comparisons and swaps highlighted.</li>
      <li><b>Bar Chart/Graph Mode</b>: Toggle between box and bar chart views for array values.</li>
      <li><b>Multiple Arrays/States</b>: Manage and switch between multiple arrays for advanced demonstrations.</li>
      <li><b>Export/Import Functionality</b>: Save and load array states as JSON or PNG.</li>
      <li><b>Undo/Redo</b>: Step backward and forward through your array operations.</li>
      <li><b>Index Labels</b>: Display index numbers below each array cell for clarity.</li>
      <li><b>Custom Color Schemes</b>: Personalize the color palette of your visualizer.</li>
      <li><b>Responsive & Accessible Design</b>: Improved experience on all devices and for all users.</li>
      <li><b>Non-intrusive Notifications</b>: Toasts for feedback instead of pop-up alerts.</li>
      <li><b>Step-by-Step Algorithm Explanations</b>: Dynamic, real-time explanations as operations run.</li>
      <li><b>Performance Metrics</b>: Track and display operation counts and complexity in real time.</li>
      <li><b>2D Arrays/Matrix Support</b>: Visualize and manipulate matrices and related algorithms.</li>
      <li><b>Linked List Mode</b>: Switch to a linked list view to compare with arrays.</li>
      <li><b>Detailed User Guide</b>: Built-in help and documentation for new users.</li>
    </ul>
  </div>
);

export default ComingSoon;
