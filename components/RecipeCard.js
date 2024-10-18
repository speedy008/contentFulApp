import Image from "next/image"
import Link from "next/link"


export default function RecipeCard( { recipe }) {
    const { title, cookingTime, thumbnail, slug } = recipe.fields
  return (
    <div className="recipeCard">
     <div className="featuredImage">
        <Image
            src={'https:' + thumbnail.fields.file.url}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
        />
     </div>
     <div className="Content">
        <div className="info">
            <h4>{title}</h4>
            <h5>Takes approx {cookingTime} mins to make</h5>
        </div>
        <div className="actions">
            <Link href={'/recipes/' + slug}><a>Cook this</a></Link>
        </div>
     </div>
     <style jsx>{`
      .recipeCard {
        background: white;
        border: 1px solid #ccc;
        margin-bottom: 20px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
      }
        .featuredImage {
          height: 200px;
          object-fit: contain;
          overflow: hidden;
        }
          .featuredImage img{
          height: 200px;
          object-fit: cover;
          }
          .Content {
            padding: 20px;
          }
     `}</style>
    </div>
  )
}
