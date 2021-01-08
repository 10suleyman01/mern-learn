import React from 'react'
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {

    if (!links.length) {
        return <p className="center">No links</p>
    }

    return (

        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original</th>
                <th>Shorted</th>
                <th>Clicked</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{ index + 1 }</td>
                        <td>{ link.from }</td>
                        <td>{ link.to }</td>
                        <td>{ link.clicks }</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open link</Link>
                        </td>
                    </tr>
                )
            }) }

            </tbody>
        </table>
    )
}