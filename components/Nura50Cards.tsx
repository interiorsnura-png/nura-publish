'use client';
import {useState} from 'react';
import {Card} from './Editorial';
import type {Entry} from '../lib/content';
export default function Nura50Cards({entries}:{entries:Entry[]}){const [query,setQuery]=useState('');const filtered=entries.filter(entry=>entry.content.title.toLowerCase().includes(query.toLowerCase()));return <><label className="review-search">Search titles<input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search article titles" aria-label="Search article titles"/></label><div className="inner-project-grid">{filtered.map((entry,index)=><Card key={entry.path} entry={entry} index={index}/>)}</div></>}
