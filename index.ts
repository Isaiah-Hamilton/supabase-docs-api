import { serve } from "https://deno.land/std/http/server.ts"
import { parse } from "https://deno.land/x/xml/mod.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
}

async function handler() {
    const sitemap = await fetch('https://supabase.com/docs/sitemap.xml')

    if (sitemap.status !== 200) {
	return new Response(JSON.stringify({ error: `couldn't fetch supabase docs sitemap` }), {
	    headers: { ...corsHeaders },
	    status: 404,
	})
    }

    const xml = await sitemap.text()

    return new Response(JSON.stringify({ sitemap: parse(xml) }), {
	headers: { ...corsHeaders },
	status: 200,
    })
}

serve(handler)