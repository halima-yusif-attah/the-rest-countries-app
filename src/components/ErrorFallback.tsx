import React from "react";


interface ErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorProps) {
  return (
    <div className="error">
      <h2>An error was found!</h2>
      <p>Error: {error.message}</p>
      <button type='button' onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
}




// export const logError = (error, info) => {
//   // const handleError = useErrorHandler();
//   console.error("Custom error handling:", error, info);
//   // You can log the error or send it to a logging service
//   // Optionally, you can call handleError to delegate the error to the parent boundary
//   handleError(error, info);
// };


// export function logError(error: { message: any; }, errorInfo: { componentStack: any; }) {
//   console.log("logError:", error.message, errorInfo.componentStack);
//   displayErrorDisplay(`Error: ${error.message} ${errorInfo.componentStack}`);
// }
