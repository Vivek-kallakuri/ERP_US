import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: File | null = null;
  uploadedBy: string = '';

  allFiles: any[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fetchAllFiles();
  }

  // Handle File Selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile()
  {
      if (!this.selectedFile || !this.uploadedBy) 
      {
        alert('Please enter "Uploaded By" field and select a file!');
        return;
      }

      this.fileService.uploadFile(this.selectedFile, this.uploadedBy).subscribe(response => {
        alert('File uploaded successfully!');
        console.log(response);
      }, error => {
        alert('File upload failed.');
        console.error(error);
      });
  }



    // Fetch all uploaded files
    fetchAllFiles() {
      this.fileService.getAllFiles().subscribe(files => {
        this.allFiles = files;
      }, error => {
        alert('Failed to fetch files.');
        console.error(error);
      });
    }


      // Download a file by its ID
  downloadFile(fileId: number, fileName: string) 
  {
    this.fileService.downloadFile(fileId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the original file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      alert('File download failed.');
      console.error(error);
    });
  }


  
}
