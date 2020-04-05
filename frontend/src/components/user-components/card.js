import React from 'react'

export default function card({ element }) {
    return (
        <div className="card border-success mb-3 m-3 col-xs-1" style={{maxWidth: 288}}>
            <div className="card-body text-success mw-100">
                <h5 className="card-title">{element.name}</h5>
                <p className="card-text">{element.description}</p>
            </div>
            <a href={element.svn_url} className="p-3">See this on github</a>
        </div>
    )
}
