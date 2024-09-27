import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const ProjectModel = mongoose.models.Project || mongoose.model("Project", ProjectSchema);


//-----------------------------------------------------

const UnitSchema = new Schema(
    {
        nmEn: { type: String, required: true },
        nmBn: { type: String, required: true },
        nmUn: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const UnitModel = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);

//-----------------------------------------------------

const HondaSchema = new Schema(
    {
        regNo: { type: String, required: true },
        regDt: { type: String, required: true },
        chassisNo: { type: String, required: true },
        engineNo: { type: String, required: true },
        condition: { type: String, required: true },
        projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
        unitId: { type: Schema.Types.ObjectId, ref: 'Unit' },
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

export const HondaModel = mongoose.models.Honda || mongoose.model("Honda", HondaSchema);

//--------------------------------------------------------------------


const HondahistorySchema = new Schema(
    {
        dt: { type: Date, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        post: { type: String, required: true },
        unit: { type: String, required: true },
        project: { type: String, required: true },
        hondaId: {type: Schema.Types.ObjectId, ref: 'Honda' },
        regCertificate: { type: String, required: true },
        helmet: { type: String, required: true },
        taxCertificate: { type: String, required: true },
        insurance: { type: String, required: true },
        remarks: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const HondahistoryModel = mongoose.models.Hondahistory || mongoose.model("Hondahistory", HondahistorySchema);  
