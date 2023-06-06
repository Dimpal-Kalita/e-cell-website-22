import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blogindi.css';
import { useParams } from 'react-router-dom';
import NavbarTeam from '../../../components/shared/Navbar/NavbarTeam';
import Footer from '../../../components/shared/Footer/Footer';

const Blogindividual = () => {
    const { _id } = useParams();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState("")
    const [writerpic, setWriterpic] = useState("")
    const [writerintro, setWriterintro] = useState("")
    const [topicpic, setTopicpic] = useState("")
    useEffect(() => {
        const fetchBlog = async () => {
            try {
         
                const response = await axios.get(process.env.REACT_APP_FETCHBLOG_RENDER + '/' + _id);
                // const response = await axios.get(`http://localhost:2226/getblogs/${_id}`);
                setContent(response.data.content);
                setTitle(response.data.title);
                setWriterpic(response.data.writerpic);
                setWriterintro(response.data.writerintro);
                setTopicpic(response.data.topicpic);
            } catch (error) {
                console.log('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [_id]);

    if (!content) {
        return <div>Loading Blog content from the server...</div>;
    }

    return (
        <>
            <NavbarTeam />
            <div className='indiviualblog'>
                <h1>{title}</h1>
                <div className="imgoldermainblogindi">
                    <img src={topicpic} alt="" />
                </div>


                <p> {content}</p>

                <div className="writerdetails">
                    <div className="imgholderwriter">
                        <img src={writerpic} alt="" />
                    </div>

                    <div className="writerintro">
                        <p>{writerintro}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Blogindividual;