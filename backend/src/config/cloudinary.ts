import {v2 as cloudinary} from 'cloudinary';
import { config } from './config';
          
cloudinary.config({ 
  cloud_name: 'dk1sodgzg', 
  api_key: config.cloudinaryKey, 
  api_secret: config.cloudinarySecret 
});

export default cloudinary