/*
// debounce requirements:
    // debounce timer will trigger upon initiation of debounce function
    // subsequent function calls will be cancelled until "t" milliseconds have elapsed
    // once t milliseconds have elapsed, the function would be back available
    // once function call is made, function is disabled until t milliseconds have elapsed 
    // ex1) t = 50, input = [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]}]
        // const log = debounce(console.log, 100);
        // operation 1. runs at 50ms: log("Hello") intended to run 50ms after its execution
        // operation 2. runs at 75ms: log("Hello") intended to run 75ms after its execution
            // there's 50ms in the timeout stack, so delete operation 1
            // operation 2 is scheduled to run at 125ms (75ms + 50ms)
        // opeation 2 runs at 125ms
    // ex2) t = 20, input = [{"t":50,"inputs":[1]},{"t":100,"inputs":[2]}]
        // const log = debounce(console.log, 100);
        // operation 1. executes at 50ms
            // schedules execution 20ms after its execution
            // scheduled to run at 70ms
        // 70ms elapsed -> operation 1 executes
        // operation 2. executes at 100ms
            // schedules execution 20ms after its execution
            // scheduled to run at 120ms
        // 120ms elapsed -> operation 2 executes
    // ex3) t = 150, input = [{"t":50,"inputs":[1,2]},{"t":300,"inputs":[3,4]},{"t":300,"inputs":[5,6]}]
        // const log = debounce(console.log, 100):
        // operation 1: executes at 50ms
            // schedules to run at 200ms (150ms + 50ms)
        // 200ms elapses -> operation 1 runs
        // operation 2: executes at 300ms
            // operation 2 is scheduled to run at 450ms (150ms + 300ms)
        // operation 3: executes at 300ms
            // operation 2 is pending -> cancel operation 2
            // schedules to run at 450ms (150ms + 300ms)
        // 450ms elapses -> operation 3 runs
// Notes
    // if an operation is "pending" (scheduled to execute) while another execution is being ran
        // clear all of the scheduled operations
        // then schedule current operation
    // if no operation is pending
        // schedule current operation
*/
type F = (...args: number[]) => void;

function debounce(fn: F, t: number): F {
  let pending: NodeJS.Timeout;

  return function (...args) {
    if (pending) {
      clearTimeout(pending);
    }

    pending = setTimeout(() => fn(...args), t);
  };
}

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
