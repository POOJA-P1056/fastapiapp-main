import type {Company} from "../types/company";
import type {Job} from "../types/job";
import {useState} from "react";

type Props = {
    companies:Company[];
    jobs:Job[];
    onEdit: (company:Company)=>void;
    onDelete: (id:number)=>void;
    onAdd: (company:Company)=>void;
}


function CompanyCard({
    companies,jobs,onAdd,onEdit,onDelete}:Props){
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [addform,setAddform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const [editform,setEditform] = useState<Company>({
        id:0,
        name:"",
        email:"",
        phone:"",
        location:"",
        jobs:[]
    });
    const handleAdd = () => {
        onAdd(addform);
        setAddform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    }
    const handleSave = () => {
        onEdit(editform);
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 
    const handlecancel = () => {
        setEditCompanyId(null);
        setEditform({
            id:0,
            name:"",
            email:"",
            phone:"",
            location:"",
            jobs:[]
        })
    } 

    return(
        <div className="card-container">
            <div className="section-header">
                <h2>Companies</h2>
                <span className="section-badge">{companies.length} Total</span>
            </div>
            
            <div className="cards-grid">
                {companies.map((company) => (
                    <div key={company.id} className="card">
                        {editCompanyId === company.id ? (
                            <div>
                                <div className="form-group">
                                    <label className="form-label">Company Name</label>
                                    <input 
                                        type="text" 
                                        value={editform.name} 
                                        onChange={(e)=>setEditform({...editform,name:e.target.value})} 
                                        placeholder="Name" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input 
                                        type="text" 
                                        value={editform.email} 
                                        onChange={(e)=>setEditform({...editform,email:e.target.value})} 
                                        placeholder="Email" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input 
                                        type="text" 
                                        value={editform.phone} 
                                        onChange={(e)=>setEditform({...editform,phone:e.target.value})} 
                                        placeholder="Phone" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input 
                                        type="text" 
                                        value={editform.location} 
                                        onChange={(e)=>setEditform({...editform,location:e.target.value})} 
                                        placeholder="Location" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="card-actions">
                                    <button onClick={handleSave} className="btn btn-primary btn-sm">Save</button>
                                    <button onClick={handlecancel} className="btn btn-secondary btn-sm">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="card-content">
                                    <h3 className="card-title">{company.name}</h3>
                                    <div className="card-field">
                                        <span className="card-field-label">Email</span>
                                        <div className="card-field-value">{company.email}</div>
                                    </div>
                                    <div className="card-field">
                                        <span className="card-field-label">Phone</span>
                                        <div className="card-field-value">{company.phone}</div>
                                    </div>
                                    <div className="card-field">
                                        <span className="card-field-label">Location</span>
                                        <div className="card-field-value">{company.location}</div>
                                    </div>
                                    <div className="card-field">
                                        <span className="card-field-label">Job Openings</span>
                                        <div className="card-field-value">{jobs.filter(j => j.company_id === company.id).length} opening{jobs.filter(j => j.company_id === company.id).length === 1 ? '' : 's'}</div>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        onClick={() => {
                                            setEditCompanyId(company.id);
                                            setEditform({
                                                id: company.id,
                                                name: company.name,
                                                email: company.email,
                                                phone: company.phone,
                                                location: company.location,
                                                jobs: company.jobs,
                                            });
                                        }}
                                        className="btn btn-primary btn-sm"
                                    >Edit</button>
                                    <button onClick={() => onDelete(company.id)} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="card-container mt-4">
                <h2>Add New Company</h2>
                <div className="add-section">
                    <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input 
                            type="text" 
                            value={addform.name} 
                            onChange={(e)=>setAddform({...addform,name:e.target.value})} 
                            placeholder="Enter company name" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                            type="text" 
                            value={addform.email} 
                            onChange={(e)=>setAddform({...addform,email:e.target.value})} 
                            placeholder="Enter email" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input 
                            type="text" 
                            value={addform.phone} 
                            onChange={(e)=>setAddform({...addform,phone:e.target.value})} 
                            placeholder="Enter phone" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input 
                            type="text" 
                            value={addform.location} 
                            onChange={(e)=>setAddform({...addform,location:e.target.value})} 
                            placeholder="Enter location" 
                            className="form-input"
                        />
                    </div>
                    <button onClick={handleAdd} className="btn btn-primary">Add Company</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard