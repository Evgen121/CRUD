import React, { useEffect, useState } from 'react';
import "./upload.css";
import { PickerOverlay } from "filestack-react";
import axios from "axios";
import FetchData from './FetchData';

const Upload = () => {
    const [isPicker, setIsPicker] = useState(false);
    const [image, setImage] = useState("");
    const [result, setResult] = useState([]);
    const [getDataLoading, setGetDataLoading] = useState(true);
    const [postDataLoading, setPostDataLoading] = useState(false);
    const [postData, setPostData] = useState();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");


    //for fetch products
    const fetchData = async () => {
        try {
            let res = await axios.get("/all");
            setGetDataLoading(false);
            setResult(res.data);
        } catch (error) {
            alert(error.response.data.msg)
            setGetDataLoading(false);

        }
    }

    //for add a new product
    const addData = async () => {
        try {
            const datas = { title, desc, image: image.filesUploaded[0].url }
            setPostDataLoading(true);
            let res = await axios.post("/", datas);
            if (res) {
                setPostDataLoading(false)
                setPostData(res.data)
            }
        } catch (error) {
            alert(error.response.data.msg)
            setPostDataLoading(false)

        }
    }
    //button
    const sumbitHandler = (e) => {
        e.preventDefault();
        !image
            ? alert("Image Require")
            : title.length < 4
                ? alert("Title is too short")
                : desc.length < 8
                    ? alert("Description is too short")
                    : addData({ title, desc, image, setPostData, setPostDataLoading })

    };

    useEffect(() => {
        fetchData({ setResult, setGetDataLoading });
        if (postData) {
            setImage("");
            setTitle("");
            setDesc("");
            fetchData({ setResult, setPostDataLoading })

        }
    }, [postData])

    return (
        <>
            <div className='row'>
                <form onSubmit={sumbitHandler} >

                    {
                        image ? (
                            <img src={image && image.filesUploaded[0].url}
                                alt={image && image.filesUploaded[0].filename} className="uploadImage" />
                        )
                            :
                            (
                                <button className='add' onClick={() => isPicker ? setIsPicker(false) : setIsPicker(true)}>Choose Herois</button>

                            )
                    }

                    <div className="input">
                        <input type="text" placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)} value={title} required />
                        <textarea value={desc}
                            onChange={(e) => setDesc(e.target.value)} rows="5" placeholder='Description' required />
                    </div>
                    <button type='submit' className='submit'> {postDataLoading ? "loading..." : "Add"}</button>

                    {
                        isPicker && (
                            <PickerOverlay
                                apikey={"AWamCt3iT3aGNU2sSGA4Rz"}
                                onSuccess={(res) => {
                                    setImage(res)
                                    setIsPicker(false)
                                }}
                                onError={(res) => alert(res)}
                                pickerOptions={{
                                    maxFiles: 1,
                                    accept: ["image/*"],
                                    errorsTimeout: 2500,
                                    maxSize: 1 * 1024 * 1024,
                                    minFiles: 1
                                }}
                            />
                        )
                    }
                </form>
            </div>
            {getDataLoading && <p className='loading'>Loading ...</p>}

            <div className='rowApp'>
                <FetchData result={result} />
            </div>
        </>
    )
}

export default Upload
