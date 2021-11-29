import { ArtPreview } from './ArtPreview.jsx';

export function ArtList({ arts , search}) {

    return (
        <section className="art-list-container">
        {search && <div className="art-list-search" >
            <div className="art-list">
                {arts.map(art => <ArtPreview art={art} key={art._id} />)}
            </div></div>}
            { !search && <div className="art-list11" >
            <div className="art-list">
                {arts.map(art => <ArtPreview art={art} key={art._id} />)}
            </div></div>}
        </section>
    )
}