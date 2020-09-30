import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Col} from "../schemas";
import {Model} from "mongoose";
import {CreateColDto, UpdateColDto} from "../dtos";

@Injectable()
export class ColService {

    constructor(@InjectModel(Col.name) private colModel: Model<Col>) {}

    async create(createColDto: CreateColDto): Promise<Col> {
        const createdCol = new this.colModel(createColDto);
        return createdCol.save();
    }

    async find(id: string): Promise<Col> {
        return this.colModel.findById(id);
    }

    async findByQuery(name: string, id: number, limit?: number): Promise<Col[]> {
        const query = name ? { name: name } : (id ? { id: id } : {});
        return this.colModel.find(query).limit(limit);
    }

    async findAll(): Promise<Col[]> {
        return this.colModel.find().exec();
    }

    async update(id: string, updateColDto: UpdateColDto): Promise<Col> {
        return this.colModel.updateOne({_id: id}, updateColDto);
    }

    async delete(id: string) {
        return this.colModel.deleteOne({ _id: id});
    }

}
