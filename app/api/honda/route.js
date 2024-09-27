import { NextResponse } from 'next/server';
import { Connect } from '@/lib/Db';
import { HondaModel } from '@/lib/Models';



export const GET = async () => {
  try {
    await Connect();
    const hondas = await HondaModel.find({isDeleted: false}).populate('projectId').populate('unitId').sort({_id:'desc'});
    return NextResponse.json( hondas );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch hondas' }, { status: 500 });
  }
}




export const POST = async (Request) => {
  try {
    await Connect();
    const { regNo, regDt, chassisNo, engineNo, condition, projectId, unitId, remarks } = await Request.json();
    const hondas = await HondaModel.create({ regNo, regDt, chassisNo, engineNo, condition, projectId, unitId, remarks });
    return NextResponse.json(hondas);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}


