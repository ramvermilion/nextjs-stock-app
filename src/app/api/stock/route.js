import { NextResponse } from "next/server";

//Stock Data
import stockData from "../../../../JSON/stockcodes.json";

async function getCompanybyID(id, response) {
  const companyById = response.filter((i) => i.id == id);

  try {
    if (companyById) {
      return companyById;
    }
  } catch (error) {
    return error;
  }
}

export async function GET(request) {
  const { response } = stockData;
  const { searchParams } = new URL(request.url);

  for (const [key, value] of searchParams) {
    if (key === "id") {
      const data = await getCompanybyID(value, response);
      if (data.length) {
        return NextResponse.json({
          response: data
        });
      } else {
        return NextResponse.json({
          error: "Company Not found!"
        });
      }
    }

    if (key === "company") {
      const companiesList = response.map((i) => {
        return { label: i.company, value: i.id };
      });

      return NextResponse.json({
        response: companiesList
      });
    }
  }

  return NextResponse.json({
    error: "Wrong URL being accessed"
  });
}
