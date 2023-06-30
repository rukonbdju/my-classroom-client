
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../../../firebase.config';
import { useState } from 'react';
const useFirebaseStorage = () => {
    const storage = getStorage(app)
    const handleUpload = async (file) => {
        try {
            const storageRef = ref(storage, file.name);
            const res = await uploadBytes(storageRef, file)
            const {bucket,name,type,contentType,size, fullPath,timeCreated,updated}=res.metadata;
            const url = await getDownloadURL(storageRef)
            const media={bucket,name,type,contentType,size,fullPath,timeCreated,updated,url}
            return media;
        } catch (error) {
            console.log(error)
        }

    };

    const handleDelete = async (file) => {
        try {
            const storageRef = ref(storage, file.name);
            const res = await deleteObject(storageRef)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };
    return {handleUpload,handleDelete}
}
export default useFirebaseStorage;