# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket 1
Add a new field to the Agents table in the database to store custom ids for each agent.

`Acceptance Criteria`

1. The added custom id field shouldn't alter any existing data
2. The custom id field should be at least 6 and at most 8 characters
3. The custom id field should not be duplicated

`Time Estimate`

4 hours

`Implementation Details`

We'll create a new table with the Agent's internal unique id along with the newly created custom id. We'll use the internal id as a foreign key and the Custom id as a primary key for this table

Whenever data is requested first we'll get the unique internal id from the newly created table and we'll query the main table for the requested data


### Ticket 2
Update the getShiftsByFacility function to include the custom id of each Agent in the list of Shifts returned

`Acceptance criteria`

1. Create a new function to retrive the required data by using custom id.
2. The new function should not affect the implementation of the agents who do not have custom ids at the moment

`Time estimate`

- 4 hours

### Ticket 3
Update the generateReport function to use the custom id of each Agent when generating the PDF report

`Acceptance criteria`

1. Create a new function to retrive the required data by using custom id.
2. The new function should not affect the implementation of the agents who do not have custom ids at the moment

`Time estimate`

- 4 hours

### Ticket 4
Test the updated getShiftsByFacility and generateReport functions to ensure they are working correctly with the new custom id field

`Acceptance criteria`

1. Write unit test to test for both existing and newly created `getShiftsByFacility` and `generateReport` functions
2. The unit test should result in the same output for a specific agent whether it's requested by unique id or custom id

`Time estimate`

- 6 hours

### Ticket 5
Update the user interface for Facilities to allow them ito input custom ids for their Agents and save them to the database

`Acceptance criteria`

1. Facilities my opt-in or opt-out of creating a custom id for agents
2. Provided custom id should be validated for length and composition

`Time estimate`

- 5 hours


