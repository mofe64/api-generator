import fs from "fs/promises";

const modelName = "Account";
const fields = [
  {
    fieldName: "email",
    fieldProps: {
      type: "String",
    },
  },
  {
    fieldName: "address",
    fieldProps: {
      type: "String",
      required: [true, "please provide address"],
      unique: true,
    },
  },
];

const mongoDbModel = `
import mongoose from "mongoose";
const ${modelName.toLowerCase()}Schema = new mongoose.Schema({
 ${fields.map(
   (field) => `${field.fieldName} : {
    ${Object.entries(field.fieldProps).map(([key, rawValue]) => {
      let value;
      if (Array.isArray(rawValue)) {
        value = JSON.stringify(rawValue);
      } else {
        value = rawValue;
      }
      return `${key} : ${value}`;
    })}
  }
 `
 )}
});

const ${modelName} = mongoose.model(${modelName}, ${modelName.toLowerCase()}Schema);
export default ${modelName}
`;

async function test(content, filePath) {
  try {
    await fs.writeFile(filePath, content, "utf8");
    console.log(`Content has been written to ${filePath}`);
  } catch (error) {
    console.error("Error writing to file:", error);
  }
}
test(mongoDbModel, "test.js");
