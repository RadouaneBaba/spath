export default {
    nodes: {
      size: 16,
      font: {
        size: 14,
        color: '#1e1e1e', // Dark gray for text
        face: 'Inter, system-ui, sans-serif',
      },
      borderWidth: 2,
      color: {
        border: '#4f46e5', // Indigo-600
        background: '#f9fafb', // Gray-50
        highlight: {
          border: '#4338ca', // Indigo-700
          background: '#e0e7ff', // Indigo-100
        },
        hover: {
          border: '#4338ca', // Indigo-700
          background: '#f3f4f6', // Gray-100
        },
      },
    },
    edges: {
        width: 2,
        color: {
          color: '#3b82f6',      
          highlight: '#1d4ed8',   
          hover: '#1d4ed8',      
        },
        smooth: {
          type: 'continuous',
          roundness: 0.5,
        },
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      keyboard: false,
    },
    /*
    physics: {
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.18,
      },
      stabilization: {
        iterations: 50,
      },
    },*/
  };