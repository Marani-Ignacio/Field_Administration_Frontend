import { combineReducers } from "@reduxjs/toolkit";
import { reducer as fieldsReducer } from "../../src/slices/fields";
import { reducer as seedsReducer } from "../../src/slices/seeds";
import { reducer as usersReducer } from "../../src/slices/users";
import {reducer as fieldReducer} from "../../src/slices/field";
import {reducer as seedReducer} from "../../src/slices/seed";


const rootReducer = combineReducers({
  field: fieldReducer,
  fields: fieldsReducer,
  seed: seedReducer,
  seeds: seedsReducer,
  users: usersReducer,
});

export default rootReducer;
