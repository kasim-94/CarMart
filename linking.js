// src/navigation/linking.js
const config = {
    screens: {
      Dashboard: 'dashboard',
      'My Cars': {
        screens: {
          CarManagement: 'car/:id',
          ARVisualization: 'ar/:id',
        },
      },
      'VR Showroom': 'vr-showroom',
      Support: 'support',
    },
  };
  
  const linking = {
    prefixes: ['https://yourapp.com', 'yourapp://'],
    config,
  };
  
  export default linking;