import type {Job} from "../types/job";
import type {Company} from "../types/company";

import {useState} from "react";

type Props = {
    jobs:Job[];
    companies:Company[];
    onEdit: (job:Job)=>void;
    onDelete: (id:number)=>void;
    onAdd: (job:Job)=>void;
}

function JobCard({
    jobs,companies,onEdit,onDelete,onAdd}:Props){
        const [editJobId, setEditJobId] = useState<number | null>(null);
        const [addform,setAddform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:"",
            company_id:0
        });
        const [editform,setEditform] = useState<Job>({
            id:0,
            title:"",
            description:"",
            salary:"",
            company_id:0
        });
        const handleAdd = () => {
            onAdd(addform);
            setAddform({
                id:0,
                title:"",
                description:"",
                salary:"",
                company_id:0
            })
        }
        const handleSave = () => {
            onEdit(editform);
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:"",
                company_id:0
            })
        }
        const handlecancel = () => {
            setEditJobId(null);
            setEditform({
                id:0,
                title:"",
                description:"",
                salary:"",
                company_id:0
            })
        }

    return(
        <div className="card-container">
            <div className="section-header">
                <h2>Job Openings</h2>
                <span className="section-badge">{jobs.length} Available</span>
            </div>
            
            <div className="cards-grid">
                {jobs.map((job) => (
                    <div key={job.id} className="card">
                        {editJobId === job.id ? (
                            <div>
                                <div className="form-group">
                                    <label className="form-label">Job Title</label>
                                    <input 
                                        type="text" 
                                        value={editform.title} 
                                        onChange={(e)=>setEditform({...editform,title:e.target.value})} 
                                        placeholder="Title" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Description</label>
                                    <input 
                                        type="text" 
                                        value={editform.description} 
                                        onChange={(e)=>setEditform({...editform,description:e.target.value})} 
                                        placeholder="Description" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Salary</label>
                                    <input 
                                        type="text" 
                                        value={editform.salary} 
                                        onChange={(e)=>setEditform({...editform,salary:e.target.value})} 
                                        placeholder="Salary" 
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <select 
                                        value={editform.company_id} 
                                        onChange={(e)=>setEditform({...editform,company_id:Number(e.target.value)})} 
                                        className="form-select"
                                    >
                                        <option value={0}>Select Company</option>
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="card-actions">
                                    <button onClick={handleSave} className="btn btn-primary btn-sm">Save</button>
                                    <button onClick={handlecancel} className="btn btn-secondary btn-sm">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="card-content">
                                    <h3 className="card-title">{job.title}</h3>
                                    <div className="card-field">
                                        <span className="card-field-label">Company</span>
                                        <div className="card-field-value">{companies.find(c => c.id === job.company_id)?.name || 'Unknown'}</div>
                                    </div>
                                    <div className="card-field">
                                        <span className="card-field-label">Description</span>
                                        <div className="card-field-value">{job.description}</div>
                                    </div>
                                    <div className="card-field">
                                        <span className="card-field-label">Salary</span>
                                        <div className="card-field-value">${job.salary}</div>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <button
                                        onClick={() => {
                                            setEditJobId(job.id);
                                            setEditform({
                                                id: job.id,
                                                title: job.title,
                                                description: job.description,
                                                salary: job.salary,
                                                company_id: job.company_id,
                                            });
                                        }}
                                        className="btn btn-primary btn-sm"
                                    >Edit</button>
                                    <button onClick={() => onDelete(job.id)} className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="card-container mt-4">
                <h2>Post New Job</h2>
                <div className="add-section">
                    <div className="form-group">
                        <label className="form-label">Job Title</label>
                        <input 
                            type="text" 
                            value={addform.title} 
                            onChange={(e)=>setAddform({...addform,title:e.target.value})} 
                            placeholder="e.g. Senior Developer" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <input 
                            type="text" 
                            value={addform.description} 
                            onChange={(e)=>setAddform({...addform,description:e.target.value})} 
                            placeholder="Enter job description" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Salary</label>
                        <input 
                            type="text" 
                            value={addform.salary} 
                            onChange={(e)=>setAddform({...addform,salary:e.target.value})} 
                            placeholder="e.g. 50000" 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <select 
                            value={addform.company_id} 
                            onChange={(e)=>setAddform({...addform,company_id:Number(e.target.value)})} 
                            className="form-select"
                        >
                            <option value={0}>Select Company</option>
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleAdd} className="btn btn-primary">Post Job</button>
                </div>
            </div>
        </div>
    )
}

export default JobCard