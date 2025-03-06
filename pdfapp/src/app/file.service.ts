import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private apiUrl = 'https://localhost:7108/upload';

  private baseUrl = 'https://localhost:7108';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, uploadedBy: string): Observable<any> 
  {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadedBy', uploadedBy);

    return this.http.post(this.apiUrl, formData);
  }

    // Fetch all file metadata
    getAllFiles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/download/all`);
    }

      // Download a specific file by ID
  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${fileId}`, { responseType: 'blob' });
  }
  
}
