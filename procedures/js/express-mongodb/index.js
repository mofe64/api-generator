import OperationError from "../../../errors/operationError";
import sampleApi from "../../../sampleApi.json" assert { type: "json" };
// console.log(sampleApi);
const dataModels = sampleApi.models;
console.log(dataModels);

//extract models names
const modelList = sampleApi.models.map((model) => model.name);

//check for model relationships
const modelRelationships = [];
sampleApi.models.map((model) => {
  const modelFields = model.fields;
  modelFields.forEach((field) => {
    if (field.type && field.type === "ref") {
      // check if reference is valid
      if (!modelList.includes(field.name)) {
        throw new OperationError();
      }
      if (field.refType === "refSingle") {
        const relationship = {
          from: model.name,
          to: field.name,
          type: "single",
        };
        modelRelationships.push(relationship);
        return;
      }
      if (field.refType === "refMultiple") {
        const relationship = {
          from: model.name,
          to: field.name,
          type: "multiple",
        };
        modelRelationships.push(relationship);
        return;
      }
      // throw exception -> invalud reference type provided
    }
  });
});

// prepare template context

// generate source code based off template and context
