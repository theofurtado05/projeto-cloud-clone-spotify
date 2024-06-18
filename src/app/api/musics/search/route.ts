import { NextRequest, NextResponse } from "next/server";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const searchClient = new SearchClient(
  "https://theofyazuresearch.search.windows.net",  // Substitua pelo endpoint do seu serviço de busca
  "azuresql-index",                                // Substitua pelo nome do índice
  new AzureKeyCredential("xRERLa9bdoruiqDrhNEOVQgtA4Y3xx0JMAf2wfniVYAzSeAhe1Il") // Substitua pela chave de administração do seu serviço de busca
);

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        if (!data.searchText) {
            return NextResponse.json({ error: "searchText is required" }, { status: 400 });
        }

        const searchResults = await searchClient.search(data.searchText);
        const resultsArray = [];

        for await (const result of searchResults.results) {
            resultsArray.push(result);
        }

        return NextResponse.json({
            searchResults: resultsArray,
            searched: data.searchText
        });
    } catch (err: any) {
        console.error("Error during search:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
