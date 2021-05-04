export const styleRules = (theme) => ({
  container: {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('landing_image.jpeg')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: '100%',
    height: '95vh'
  },
  gridContainer: {
    textAlign: 'center'
  },
  heading: {
    color: '#fff',
    fontWeight: 500,
    fontSize: 64,
    letterSpacing: 2
  },
  description: {
    color: '#fff'
  },
  loginButton: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`
  }
});