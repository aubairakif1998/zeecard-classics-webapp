class LinkModel {
  constructor({ label, url }) {
    this.label = label;
    this.url = url;

    this.toMap = () => ({
      label: this.label,
      url: this.url,
    });

    return this;
  }
  static fromMap(map) {
    return new LinkModel(map);
  }
}

class UserModel {
  constructor({
    uid,
    uniqueHandle,
    username,
    email,
    name,
    links,
    bio,
    dob,
    gender,
    profilePicture,
    isVerified,
    timesZeecard,
    isPrivate,
    joinDate,
    directLink,
    linkSequence,
  }) {
    this.uid = uid;
    this.uniqueHandle = uniqueHandle;
    this.username = username;
    this.email = email;
    this.name = name ?? null;
    this.links = links ? links.map((link) => new LinkModel(link)) : [];
    this.bio = bio ?? null;
    this.dob = dob ? new Date(dob) : null;
    this.gender = gender ?? null;
    this.profilePicture = profilePicture ?? null;
    this.isVerified = isVerified ?? null;
    this.timesZeecard = timesZeecard ?? null;
    this.isPrivate = isPrivate ?? false;
    this.joinDate = joinDate ? new Date(joinDate) : null;
    this.directLink = directLink ?? null;
    this.linkSequence = linkSequence || [];

    this.toMap = () => ({
      uid: this.uid,
      uniqueHandle: this.uniqueHandle,
      username: this.username,
      email: this.email,
      name: this.name,
      bio: this.bio,
      links: this.links.map((link) => link.toMap()),
      dob: this.dob ? this.dob.getTime() : null,
      gender: this.gender,
      profilePicture: this.profilePicture,
      isVerified: this.isVerified,
      timesZeecard: this.timesZeecard,
      isPrivate: this.isPrivate,
      directLink: this.directLink,
      joinDate: this.joinDate ? this.joinDate.getTime() : null,
      linkSequence: this.linkSequence,
    });

    this.toJson = () => JSON.stringify(this.toMap());

    this.geturl = () => `https://jibl.me/p/${this.uniqueHandle}`;

    this.getSharedUrl = () => `https://jibl.me/p/${this.username}`;

    this.toString = () => {
      return `UserModel(uid: ${this.uid}, username: ${this.username}, email: ${
        this.email
      }, name: ${this.name}, bio: ${this.bio}, dob: ${
        this.dob
      }, links: ${JSON.stringify(this.links)}, gender: ${
        this.gender
      }, profilePicture: ${this.profilePicture}, isVerified: ${
        this.isVerified
      }, timesZeecard: ${this.timesZeecard}, isPrivate: ${
        this.isPrivate
      }, directLink: ${this.directLink}, joinDate: ${
        this.joinDate
      }, uniqueHandle: ${this.uniqueHandle}, linkSequence: ${JSON.stringify(
        this.linkSequence
      )})`;
    };

    return this;
  }
  static fromMap(map) {
    return new UserModel(map);
  }
  static fromJson(source) {
    return UserModel.fromMap(JSON.parse(source));
  }
}

module.exports = UserModel;
