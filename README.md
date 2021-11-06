# Perform Asynchronous Operation

Wrapper function to be included in the tools library. Follows the logic
of some other languages (like Rust). The result is of async operation is
not exposed directly, but through dedicated callback functions. This a way
to protect your application from untyped, undefined or null value.