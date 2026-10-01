import {Fragment} from 'react';
import {Photo} from './Editorial';
export type ArticleNode={type:string;text?:string;bold?:boolean;italic?:boolean;link?:string;level?:number;children?:ArticleNode[];src?:string;alt?:string;caption?:string;url?:string};
export default function RichArticle({nodes}:{nodes:ArticleNode[]}) {
  return <>{nodes.map((node,index)=>{
    const key=index;
    if(node.type==='text'){
      let text=<>{node.text}</>;
      if(node.bold)text=<strong>{text}</strong>;
      if(node.italic)text=<em>{text}</em>;
      if(node.link&&/^(https?:\/\/|mailto:|\/(?!\/))/.test(node.link))text=<a href={node.link}>{text}</a>;
      return <Fragment key={key}>{text}</Fragment>;
    }
    const children=<RichArticle nodes={node.children||[]}/>;
    if(node.type==='paragraph')return <p key={key}>{children}</p>;
    if(node.type==='heading'){const Tag=node.level===3?'h3':node.level===4?'h4':'h2';return <Tag key={key}>{children}</Tag>;}
    if(node.type==='ul')return <ul key={key}>{children}</ul>;
    if(node.type==='ol')return <ol key={key}>{children}</ol>;
    if(node.type==='li')return <li key={key}>{children}</li>;
    if(node.type==='image'&&node.src)return <figure key={key} className="article-photo"><Photo asset={{filename:node.src,alt:node.alt}} fallbackAlt="Illustration accompanying the article" sizes="(max-width:800px) 100vw, 55vw"/>{node.caption?<figcaption>{node.caption}</figcaption>:null}</figure>;
    if(node.type==='video'&&node.url&&/^https?:\/\//.test(node.url))return <p key={key}><a href={node.url}>Watch the accompanying video</a></p>;
    return <Fragment key={key}>{children}</Fragment>;
  })}</>;
}
