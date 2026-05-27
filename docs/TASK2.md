## Overview
As a user of the UI currency conversion app
I want to be able to input an amount in either the "From" or "To" currency field and have the other field update automatically So that I can easily calculate conversions in reverse without having to swap the selected currencies.

## Acceptance Criteria
[x] Typing an amount in the "From" input should calculate and populate the "To" input based on the current exchange rate.

[x] Typing an amount in the "To" input should reverse-calculate and populate the "From" input based on the current exchange rate.

[x] Changing the selected currency in either dropdown should instantly recalculate and update the appropriate field.

[x] The application must remain stable and not enter an infinite re-render loop or trigger continuous API calls.

Non-Functional Requirements

[x] Usability

[x] The active input field should feel fluid and not interrupt the user's typing (e.g., handling decimal points gracefully).

[x] The transition between typing in the "From" field and the "To" field should be seamless.
