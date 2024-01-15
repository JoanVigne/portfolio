const FetchData = ({ children }: { children: React.ReactNode }) => {
    // profile :
    const { profile, updateProfile } = useProfileContext();
    useEffect(() => {
      // Vérifiez si profile est un tableau vide
      if (Array.isArray(profile) && profile.length === 0) {
        const fetchProfile = async () => {
          try {
            const fetchedProfile = await fetchDataDB("profile");
            updateProfile(fetchedProfile);
          } catch (error) {
            console.error("Erreur lors du fetch du profil :", error);
          }
        };
        fetchProfile();
      }
    }, [profile, updateProfile]);
  
    // formations :
    const { formations, updateFormations } = useFormationsContext();
    useEffect(() => {
      // Vérifiez si formations est un tableau vide
      if (Array.isArray(formations) && formations.length === 0) {
        const fetchFormations = async () => {
          try {
            const fetchedFormations = await fetchDataDB("formations");
            updateFormations(fetchedFormations);
          } catch (error) {
            console.error("Erreur lors du fetch du formations :", error);
          }
        };
        fetchFormations();
      }
    }, [formations, updateFormations]);
  
    return <>{children}</>;
  };
  