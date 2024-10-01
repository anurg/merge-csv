const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { stringify } = require('csv-stringify/sync');

// Directory containing the CSV files
const csvDir = './csv-files'; // Adjust this path to where your CSV files are stored
const outputFile = './merged-output.csv'; // Output file where the merged CSV will be saved

let mergedData = [];
let headersWritten = false;

// Get the list of CSV files from the folder
fs.readdir(csvDir, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }

  // Filter to include only CSV files
  const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
  
  if (csvFiles.length === 0) {
    console.error('No CSV files found in the folder.');
    return;
  }



  csvFiles.forEach((file, index) => {
    const filePath = path.join(csvDir, file);

    // Read and parse each CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        row.fileName = file;
        // Push the data to mergedData array
        mergedData.push(row);
      })
      .on('end', () => {
        console.log(`Finished processing file: ${file}`);

        // Once all files are processed, write the merged data to the output file
        if (index === csvFiles.length - 1) {
          writeMergedCSV(mergedData);
        }
      })
      .on('error', (error) => {
        console.error(`Error processing file ${file}:`, error);
      });
  });
});

// Function to write the merged data into a single CSV file
function writeMergedCSV(data) {
  const headerRow = Object.keys(data[0]); // Extract headers from the first row

  // Prepare CSV output with headers and data
  const csvContent = stringify(data, { header: !headersWritten, columns: headerRow });
  
  // Write the CSV content to the output file
  fs.writeFile(outputFile, csvContent, (err) => {
    if (err) {
      console.error('Error writing merged CSV file:', err);
      return;
    }
    console.log(`Merged CSV file created at: ${outputFile}`);
  });
}

