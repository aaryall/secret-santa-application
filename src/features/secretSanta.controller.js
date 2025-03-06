import path from 'path';
import {FileServices} from './secretSanta.services.js'

export class FileServiceController{
    static async generateData(req,res){
        try {
            if(!req.file){
                return res.status(400).json({
                    message: 'No file uploaded'
                })
            }
            const employeesData = FileServices.readEmployeesFromCSV(req.file.path);
            const assignedChild = FileServices.assignSecretSanta(employeesData);
            if(assignedChild.length === 0){
                throw new Error('assignement unsuccessful');
            }

            const d = new Date();
            let year = d.getFullYear();
            // Create output filename
            const outputFilename = `Secret-Santa-Game-Result-${year}.xlsx`;
            const outputPath = path.join('outputFiles', outputFilename);
            // Export assignments
            const exportedFilePath = FileServices.exportAssignmentsToCSV(
                assignedChild, 
                outputPath
            );

            res.status(200).json({
                message:"Read CSV successfully",
                employeesData: assignedChild
            })
            
        } catch (error) {
            res.status(500).json({
                message:'Failed to read CSV file',
                error: error.message
            })
        }
    }
}