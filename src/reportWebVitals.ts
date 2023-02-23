import { ReportHandler } from 'web-vitals';

// Defining a function that reports web vitals
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // Checking if the 'onPerfEntry' parameter is defined and a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Using dynamic imports to asynchronously load the 'web-vitals' package
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Calling each of the web vitals functions with the 'onPerfEntry' function
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Exporting the 'reportWebVitals' function as the default export of this file
export default reportWebVitals;
