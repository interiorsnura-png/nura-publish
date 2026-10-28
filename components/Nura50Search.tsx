'use client';
import {useState} from 'react';
export default function Nura50Search(){const [query,setQuery]=useState('');return <label className="review-search">Search titles<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search article titles" aria-label="Search article titles"/><style jsx>{`input{display:block;width:100%;margin-top:8px;padding:12px;border:1px solid var(--line);background:var(--paper);font:inherit}`}</style></label>}
