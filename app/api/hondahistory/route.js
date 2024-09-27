import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { HondahistoryModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const hondahistorys = await HondahistoryModel.find({isDeleted: false}).populate('hondaId').sort({_id:'desc'});
    return NextResponse.json( hondahistorys );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch hondahistorys' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { dt, name, mobile, post, unit, project, hondaId, regCertificate, helmet, taxCertificate, insurance, remarks } = await Request.json();
    const hondahistorys = await HondahistoryModel.create({ dt, name, mobile, post, unit, project, hondaId, regCertificate, helmet, taxCertificate, insurance, remarks });
    return NextResponse.json(hondahistorys);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}