const resumeSupabase = supabase.createClient(supabaseURL, supabaseKey);

async function fetchDatafromSupabase() {
    const { data, error } = await resumeSupabase.from("resume").select();
    const activeSection = data[0].section;

    setActiveResume(activeSection);

    if (error) {
        setDefaultResume();
    }
}

async function updateDataInSupabase(newSection) {
    const { error } = await resumeSupabase.from("resume").update({ section: newSection }).eq("id", "1");

    if (error) {
        setDefaultResume();
    }
}
fetchDatafromSupabase();
