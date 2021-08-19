const { readFileFSPromise, readdirFSPromise, renameFSPromise } = require("../utils");
const path = require("path");

const pathToBoysFolder = path.join(__dirname, 'boys');
const pathToGirlsFolder = path.join(__dirname, 'girls');
const femaleGender = 'female';

const moveFile = async ({ pathToFile, fileName, newPathToFile }) => {
    const newFullPath = path.join(newPathToFile, fileName);

    await renameFSPromise(pathToFile, newFullPath);
}

const checkFile = async (fileName, folderPath) => {
    try {
        const fullPathToFile = path.join(folderPath, fileName);
        const file = await readFileFSPromise(fullPathToFile);
        const { gender } = JSON.parse(file.toString());
        const isGirl = gender === femaleGender;
        const isFileInGirlsFolder = folderPath === pathToGirlsFolder;
        const isMovingGirlFromBoysFolder = isGirl && !isFileInGirlsFolder;
        const isMovingBoyFromGirlsFolder = !isGirl && isFileInGirlsFolder;

        if (isMovingGirlFromBoysFolder || isMovingBoyFromGirlsFolder) {
            await moveFile({
                pathToFile: fullPathToFile,
                newPathToFile: isMovingGirlFromBoysFolder ? pathToGirlsFolder : pathToBoysFolder,
                fileName
            });
        }
    } catch (err) {
        console.error(err);
    }
};

const sortFilesByGender = async (folderPath) => {
    try {
        const files = await readdirFSPromise(folderPath);

        for (const file of files) {
            await checkFile(file, folderPath);
        }
    } catch (err) {
        console.error(err);
    }
};

void sortFilesByGender(pathToBoysFolder);
void sortFilesByGender(pathToGirlsFolder);