# Task 5

Continued from Task 3 and Task 4. Add following implementations:

- Add a new collection Store.
- Store schema must include Name, logo, type, location (Store types are: Electronics, Grocery, Clothing, Stationery)
- Store location should be indexed using 2dSphere
- Store should be associated with User id.
- Add a new Image field in Product and User Schema
- Products should be associated with Store Schema
- Create a new Query to that sends location coordinates in request body and the API returns all the Stores within 1KM radius of the location.
  - Hint:
    - Use location coordinates of the store, Use aggregation pipeline for location based query.
    - This query must have searching based on store name
