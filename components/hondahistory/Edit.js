import React, { useState } from "react";
import { TextEn, BtnSubmit, TextDt } from "@/components/Form";
import { updateDataToFirebase } from "@/lib/firebaseFunction";
import { formatedDate } from "@/lib/utils";


const Edit = ({ message, id, data }) => {
    const [dt, setDt] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [post, setPost] = useState('');
    const [project, setProject] = useState('');
    const [unit, setUnit] = useState('');
    const [hondaId, setHondaId] = useState('');
    const [regCertificate, setRegCertificate] = useState('');
    const [helmet, setHelmet] = useState('');
    const [taxCertificate, setTaxCertificate] = useState('');
    const [insurance, setInsurance] = useState('');
    const [remarks, setRemarks] = useState('');
    const [createdAt, setCreatedAt] = useState('');


    const [show, setShow] = useState(false);
    const [pointerEvent, setPointerEvent] = useState(true);




    const showEditForm = async () => {
        setShow(true);

        try {
            const { dt, name, mobile, post, project, unit, hondaId, regCertificate, helmet, taxCertificate, insurance, remarks, createdAt } = data;
            setDt(formatedDate(dt));
            setName(name);
            setMobile(mobile);
            setPost(post);
            setProject(project);
            setUnit(unit);
            setHondaId(hondaId);
            setRegCertificate(regCertificate);
            setHelmet(helmet);
            setTaxCertificate(taxCertificate);
            setInsurance(insurance);
            setRemarks(remarks);
            setCreatedAt(createdAt);
        } catch (error) {
            console.error('Failed to fetch delivery data:', error);
        }
    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            dt: dt,
            name: name,
            mobile: mobile,
            post: post,
            project: project,
            unit: unit,
            hondaId: hondaId,
            regCertificate: regCertificate,
            helmet: helmet,
            taxCertificate: taxCertificate,
            insurance: insurance,
            remarks: remarks,
            createdAt: createdAt,
            isEditable: 'no'
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setPointerEvent(false);
            const newObject = createObject();
            const msg = await updateDataToFirebase("hondahistory", id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving hondahistory data:", error);
            message("Error saving hondahistory data.");
        } finally {
            setPointerEvent(true);
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 px-4 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-11/12 md:w-1/2 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextEn Title="Name" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={50} />
                                    <TextEn Title="Mobile" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={50} />
                                    <TextEn Title="Post (Designation)" Id="post" Change={e => setPost(e.target.value)} Value={post} Chr={50} />
                                    <TextEn Title="Project" Id="project" Change={e => setProject(e.target.value)} Value={project} Chr={50} />
                                    <TextEn Title="Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit} Chr={50} />
                                    <TextEn Title="RegCertificate" Id="regCertificate" Change={e => setRegCertificate(e.target.value)} Value={regCertificate} Chr={50} />
                                    <TextEn Title="Helmet" Id="helmet" Change={e => setHelmet(e.target.value)} Value={helmet} Chr={50} />
                                    <TextEn Title="TaxCertificate" Id="taxCertificate" Change={e => setTaxCertificate(e.target.value)} Value={taxCertificate} Chr={50} />
                                    <TextEn Title="Insurance" Id="insurance" Change={e => setInsurance(e.target.value)} Value={insurance} Chr={50} />
                                    <TextEn Title="Remarks" Id="remarks" Change={e => setRemarks(e.target.value)} Value={remarks} Chr={250} />
                                </div>
                                <div className={`w-full mt-4 flex justify-start ${pointerEvent ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;






