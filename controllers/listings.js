const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const { category, location, minPrice, maxPrice, q } = req.query;

  let filterQuery = {};

  const validCategories = [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castles",
    "Amazing Pools",
    "Camping",
    "Farms",
    "Arctic",
    "Domes",
    "Boats",
    "Treehouses",
    "Beachfront",
    "Desert",
  ];

  // 1. Category Filter (Strict Whitelist Validation)
  if (
    category &&
    typeof category === "string" &&
    validCategories.includes(category)
  ) {
    filterQuery.category = category;
  }

  // 2. Location Filter (Sanitized & Escaped against Regex Injection / ReDoS)
  if (location && typeof location === "string") {
    const trimmedLocation = location.trim();
    if (trimmedLocation.length > 0 && trimmedLocation.length <= 100) {
      const escapedLocation = trimmedLocation.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        "\\$&",
      );
      filterQuery.location = { $regex: escapedLocation, $options: "i" };
    }
  }

  // 3. Price Range Filter (Type Conversion & Validation)
  if (minPrice !== undefined || maxPrice !== undefined) {
    filterQuery.price = {};

    if (minPrice !== undefined && !isNaN(minPrice)) {
      const parsedMin = Number(minPrice);
      if (parsedMin >= 0) filterQuery.price.$gte = parsedMin;
    }

    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      const parsedMax = Number(maxPrice);
      if (parsedMax >= 0) filterQuery.price.$lte = parsedMax;
    }

    // Clean up empty price object if invalid numbers were sent
    if (Object.keys(filterQuery.price).length === 0) {
      delete filterQuery.price;
    }
  }

  // 4. Global Search Query (Sanitized & Escaped)
  if (q && typeof q === "string") {
    const trimmedQ = q.trim();
    if (trimmedQ.length > 0 && trimmedQ.length <= 100) {
      const escapedQuery = trimmedQ.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      filterQuery.$or = [
        { title: { $regex: escapedQuery, $options: "i" } },
        { location: { $regex: escapedQuery, $options: "i" } },
        { category: { $regex: escapedQuery, $options: "i" } },
      ];
    }
  }

  // Fetch securely filtered results
  const allListings = await Listing.find(filterQuery).populate("owner");

  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: {
        path: "author", // Deep populates the user data inside each review
      },
    });

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  // --- ASSIGN THE LOGGED-IN USER AS THE OWNER ---
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // 1. First, find and update the text fields
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // 2. Check if a new file was uploaded
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    // Assign the new image details to the listing document
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
