import { createClient } from "contentful"
import Image from "next/image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const getStaticPaths = async () => {
  const response = await client.getEntries({
    content_type: 'recipe'
  })

  const paths = response.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug
  })

  return {
    props: {
      recipe: items[0],
      revalidate: 1
    }
  }
}

export default function RecipeDetails({ recipe }) {
  const { title, cookingTime, ingredients, method , featureImage} = recipe.fields

  if (!recipe) return <Skeleton />

  return (
    <div className="recipeCardDetailWrapper">
      <Image
        src={'https:' + featureImage.fields.file.url}
        width={featureImage.fields.file.details.image.width}
        height={featureImage.fields.file.details.image.height}
      />
      <h1 className="title">{title}</h1>  
      <div className="info">
        <p>Takes approx {cookingTime} mins to make</p>
        
        <ul className="ingList">
        <li>Ingredients:</li>
          {ingredients.map((i,key) => (
            <li className="ingListItem" key={key}>{i}</li>
          ))}
        </ul>
        <p className="recipeDetail">{documentToReactComponents(method)}</p>
      </div>
      <style jsx>
       {`
        .recipeCardDetailWrapper {
          text-align: center;
        }
        .title {
          color: #333;
          margin-bottom: 20px;
        }
        .ingList {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        } 
        .ingListItem{
          background: #c5d8f7;
          padding: 10px;
        } 
        .recipeDetail {
         color: #6da9b5
        }
      `}
      </style>
    </div>
  )
}