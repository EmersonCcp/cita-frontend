import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private supabase: SupabaseClient

  constructor(
    
  ) { 
    this.supabase = createClient(
      environment.supabase.url,
       environment.supabase.key);
  }

  async createBucketImage() {
    const {data, error} = await this.supabase.storage
    .createBucket('servicios');

    return {data, error};
  }

  async getBucketImage(bucket: string) {
    const {data, error} = await this.supabase.storage
    .getBucket(bucket);

    return {data, error}
  }


  async upload(bucket: string, path: string, file: File){

    const {data, error} = await this.supabase.storage.from
    (bucket).upload(path, file, {contentType: file.type});

    return {data, error};
  }

  async download(bucket: string, path: string){
    const {data, error} = await this.supabase.storage.from
    (bucket).list(path);

    return {data, error};
  }

  async delete(bucket: string, path: string) {
    const { data, error } = await this.supabase.storage.from(bucket).remove([path]);
    return { data, error };
  }
}
