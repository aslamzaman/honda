"use client";
import React, { useState, useEffect, useRef } from "react";
import Add from "@/components/hondahistory/Add";
import { fetchDataFromAPI, formatedDateDot } from "@/lib/utils";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Tiro_Bangla } from 'next/font/google';
const tiro = Tiro_Bangla({ subsets: ['bengali'], weight: "400" });



const Hondahistory = () => {
  const [hondahistorys, setHondahistorys] = useState([]);
  const [waitMsg, setWaitMsg] = useState("");
  const [msg, setMsg] = useState("Data ready");

  const [data, setData] = useState({});
  const [print, setPrint] = useState(false);

  const pageRef = useRef();

  useEffect(() => {
    const getData = async () => {
      setWaitMsg('Please Wait...');
      try {
        const data = await fetchDataFromAPI("hondahistory");
        setHondahistorys(data);
        setWaitMsg('');
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();


    const load = async () => {
      setWaitMsg("Please wait...");
      try {
        const doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true
        });

        const canvas = await html2canvas(pageRef.current, {
          scale: 4,
          useCORS: true
        })
        const url = canvas.toDataURL("images/png", 1.0);
       // console.log(url);
        doc.addImage(url, "PNG", 0, 0, 210, 297);

        doc.save("honda_inforamtion.pdf");
        setPrint(false);
        setWaitMsg("");
      } catch (err) {
        console.log(err);
      }
    }
    if (print) { load() };


  }, [msg, print]);


  const messageHandler = (data) => {
    setMsg(data);
  }


  const printHandler = (id) => {
    const honda = hondahistorys.find(h => h._id === id);

    const normalize = {
      dt: honda.dt,
      name: honda.name,
      mobile: honda.mobile,
      post: honda.post,
      unit: honda.unit,
      project: honda.project,
      regNo: honda.hondaId.regNo,
      regDt: honda.hondaId.regDt,
      chassisNo: honda.hondaId.chassisNo,
      engineNo: honda.hondaId.engineNo,
      regCertificate: honda.regCertificate,
      helmet: honda.helmet,
      taxCertificate: honda.taxCertificate,
      insurance: honda.insurance,
      remarks: honda.remarks
    }
    setData(normalize);
    setPrint(true);
  }



  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Hond Information</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
        <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
      </div>
      <div className="px-4 lg:px-6">
        <div className="p-4 overflow-auto">

          <table className="w-full border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-200">
                <th className="text-center border-b border-gray-200 px-4 py-1">Date</th>
                <th className="text-center border-b border-gray-200 px-4 py-1">Name</th>
                <th className="text-center border-b border-gray-200 px-4 py-1">Honda</th>
                <th className="text-center border-b border-gray-200 px-4 py-1">Remarks</th>
                <th className="w-[95px] border-b border-gray-200 px-4 py-2">
                  <div className="w-[90px] h-[45px] flex justify-end space-x-2 p-1 font-normal">
                    {/* <Print data={hondahistorys} /> */}
                    <Add message={messageHandler} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {hondahistorys.length ? (
                hondahistorys.map(hondahistory => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={hondahistory._id}>
                    <td className="text-center py-1 px-4">{formatedDateDot(hondahistory.dt, true)}</td>
                    <td className="text-center py-1 px-4"><span className="font-bold">{hondahistory.name}</span><br />
                      {hondahistory.post}<br />
                      {hondahistory.mobile}<br />
                      {hondahistory.unit}<br />
                      {hondahistory.project}
                    </td>
                    <td className="text-center py-1 px-4"><span className="font-bold">{hondahistory.hondaId.regNo}</span><br />
                      Registration: {hondahistory.regCertificate}<br />
                      Helmet: {hondahistory.helmet}<br />
                      Tax Certificate: {hondahistory.taxCertificate}<br />
                      Insurance: {hondahistory.insurance}
                    </td>
                    <td className="text-center py-1 px-4">{hondahistory.remarks}</td>
                    <td className="text-center py-2">
                      <div className="h-8 flex justify-end items-center space-x-1 mt-1 mr-2">
                        <button onClick={() => printHandler(hondahistory._id)} className="px-4 py-1 border border-blue-300 rounded-full bg-gray-200 hover:bg-white">Print</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="text-center py-10 px-4">
                    Data not available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`w-[1px] h-[1px] overflow-auto ${tiro.className}`}>
        <div ref={pageRef} className="w-[595px] h-[842px] px-[52px] py-[70px] mx-auto text-[13px] border border-black">
          <div className="w-full">
            <h1 className="text-lg text-center font-semibold">Honda Received Acknowledgement</h1>
            <p className="w-full text-center">Date: {formatedDateDot(new Date(), true)}</p>

            <p className="w-full text-center mt-5">
              <span className="font-bold">Honda Information</span><br />
              Registration No: {data.regNo}<br />
              Chassis No: {data.chassisNo}<br />
              Engine No: {data.engineNo}<br />
              Registration Date: {formatedDateDot(data.regDt ? data.regDt : new Date(), true)}
            </p>


            <p className="w-full text-center mt-5">
              <span className="font-bold">Documents and Others</span><br />
              Registration Certificate: {data.regCertificate}<br />
              Helmet: {data.helmet}<br />
              Tax Certificate: {data.taxCertificate}<br />
              Insurance: {data.insurance}
            </p>

            <p className="w-full text-center mt-5">
              <span className="font-bold">Remarks: </span>{data.remarks}
            </p>


            <p className="w-full text-center mt-24">
              <span className="font-bold">{data.name}</span><br />
              {data.post}<br />
              Mobile: {data.mobile}<br />
              Unit: {data.unit}; Project: {data.project}<br />
              {formatedDateDot(data.dt ? data.dt : new Date(), true)}
            </p>

          </div>
        </div>

      </div>


    </>
  );

};

export default Hondahistory;

