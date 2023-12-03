import fs from "fs/promises";
import OperationError from "../errors/operationError";

export const loadRawJsonConfig = async (filePath) => {
  try {
    const rawApiConfig = await fs.readFile(filePath, "utf-8");
    const apiConfig = JSON.parse(rawApiConfig);
    return apiConfig;
  } catch (error) {
    throw new OperationError(
      "Error loading/parsing api json config file",
      "loadRawJsonConfig",
      {
        originalErrorMessage: error.message,
        apiconfigFilePath: filePath,
      }
    );
  }
};

loadRawJsonConfig("../sampleApi.json");
