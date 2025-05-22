'use client'

import SubmitButton from "@/components/submit-button";
import FileInput from "../components/file-input";
import { uploadAvator } from "@/lib/actions";
import { FormEvent, useState } from "react";


export default function Page() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateFile = (file: File) => {
        if (!file) {
            return "please select a file";
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)){
            return "Only JPEG or PNG file is allowed";
        }

        if (file.size > 512 * 1024) {
            return "File size must be less than 512 KB";
        }

        return null
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        const formData = new FormData(e.currentTarget);

        const file = formData.get('file') as File;
        const validationError = validateFile(file);

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await uploadAvator(formData);
            setSuccess(true);
        } catch(err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to upload avatar";
            setError(errorMessage);
        }
    }


    return (
        <>
            <h1 className="text-4xl font-semibold mb-8">
                Avatar
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <FileInput type="file" name="file" id="file" className="appearance-auto"/>
                <SubmitButton>Upload Avatar</SubmitButton>
            </form>
            
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mt-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mt-4">
                    Avatar uploaded successfully!
                </div>
            )}
        </>
    )
}