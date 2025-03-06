
import XLSX from "xlsx";
import {Randomizer} from '../utils/shuffleArray.js'
import path from 'path'
import fs from 'fs';
export class FileServices{
    static readEmployeesFromCSV(filePath){
        try {
            const workBook = XLSX.readFile(filePath);
            let workSheets = {};
            //Converting .xlsx file to array of objects
            for (const sheetName of workBook.SheetNames) {
                workSheets[sheetName] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            }
            //Data cleaning
            const tableData = JSON.stringify(workSheets);
            const parsedData = JSON.parse(tableData); 
            return parsedData;
            


        } catch (error) {
            console.error("Error reading .xlsx file:", error);
            throw new Error('Failed to read employee CSV');
        }
    }


    static assignSecretSanta(employees){
        let employeeList = employees["Employee-List"];
        
        if (employeeList.length < 2) {
            throw new Error('Minimum 2 employees required for Secret Santa');
        }
        let recepients = Randomizer.shuffleArray([...employeeList]);
        if(recepients.length === 0){
            throw new Error('Unable to create a random array of Employee')
        }
       
        let output = [];
        let usedRecipients = new Set();
        for(let giver of employeeList){
            //Find valid random child secret
            let validChildList = recepients.filter((recepient)=>{

                return recepient?.Employee_EmailID != giver?.Employee_EmailID && !usedRecipients.has(recepient?.Employee_EmailID)
            });
            //Assign one random child to current employee.
            const oneRandomChild = validChildList[0];
            output.push({
                Employee_Name: giver?.Employee_Name,
                Employee_EmailID: giver?.Employee_EmailID,
                Secret_Child_Name: oneRandomChild?.Employee_Name,
                Secret_Child_EmailID: oneRandomChild?.Employee_EmailID
            });

            //Remove that child so that it dont get pick in any other iteration 
            recepients = recepients.filter((child)=>{
                return child.Employee_EmailID !== oneRandomChild?.Employee_EmailID
            });
            usedRecipients.add(oneRandomChild?.Employee_EmailID);
        }
        return output;
    }

    static exportAssignmentsToCSV(assignedEmployeesList , outputPath){
        try {
            const data = [
                ['Employee_Name', 'Employee_EmailID', 'Secret_Child_Name', 'Secret_Child_EmailID']
            ];

        
            assignedEmployeesList.forEach(assignment => {
                data.push([
                    assignment?.Employee_Name,
                    assignment?.Employee_EmailID,
                    assignment?.Secret_Child_Name,
                    assignment?.Secret_Child_EmailID
                ]);
            });
        
            // Create a new workbook and add a worksheet
            const workbook = XLSX.utils.book_new(); 
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            worksheet['!cols'] = [
                { wch: 20 }, 
                { wch: 40 },
                { wch: 20 }, 
                { wch: 40 }  
            ];
            XLSX.utils.book_append_sheet(workbook, worksheet, 'assignedEmployeesList');
        
            // add exports directory exists
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        
            // Write the workbook to an .xlsx file
            XLSX.writeFile(workbook, outputPath);
        
            console.log(`Excel file saved at ${outputPath}`);
        } catch (error) {
            console.error('Error generating Excel file:', error);
        }
    }
}

