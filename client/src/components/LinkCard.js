import React from 'react'

export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Ссылка</h2>
            <p>Shorted link <a href={ link.to } target='_blank' rel='noopener noreferer'>{ link.to }</a></p>
            <p>From <a href={ link.from } target='_blank' rel='noopener noreferer'>{ link.from }</a></p>
            <p>Clicked <strong>{ link.clicks }</strong></p>
            <p>Created at <strong>{ new Date(link.date).toLocaleDateString() }</strong></p>
        </>
    )
}